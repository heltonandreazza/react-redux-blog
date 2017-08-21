import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          /*onChange={field.input.onChange}
          onFocus={field.input.onFocus}
          onBlur={field.input.onBlur}*/
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''} {/* redux-form match the Validate() errors.prop with the field name prop and show the validation message */}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    console.log(values); //show the input values
    this.props.createPost(values, () => {
      this.props.history.push('/')
    });
  }

  render() {
    // handleSubmit is a redux-form property for handling the submit
    // role: if the form is valid run the function
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          component={this.renderField}
          label="Title"
        />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field
          name="content"
          component={this.renderField}
          label="Post content"
        />
        <button type="submit" className="btn">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asd', categories: 'asdas', content: 'asasd'}
  const errors = {};

  // validate the inputs from 'values' object
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter a categories!";
  }
  if (!values.content) {
    errors.content = "Enter a content!";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any propesties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm' //string must be unique otherwise it could be merged with other redux-forms witht he same name
})(
  connect(null, { createPost })(PostsNew)
  );