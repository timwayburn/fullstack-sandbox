import React from 'react'
import {compose, branch, renderNothing} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import {Form, Field} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {FieldArray} from 'react-final-form-arrays'
import {RegularTextField} from '../../shared/FormFields'
import {required} from '../../shared/FormValidators'
import AutoSave from '../AutoSave'

const styles = (theme) => ({
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: theme.spacing.unit
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

const save = async values => {
  console.log('Saving', values)

}

export const ToDoListForm = compose(
  withStyles(styles),
  branch(
    ({toDoList}) => !toDoList,
    renderNothing
  )
)(({toDoList, classes, style, saveToDoList}) => {
  return <Card style={style}>
    <CardContent>
      <Typography
        variant='headline'
        component='h2'
      >
        {toDoList.title}
      </Typography>
      <Form
        onSubmit={save}
        initialValues={{id: toDoList.id, todos: toDoList.todos}}
        mutators={{
          ...arrayMutators
        }}
        render={({
          handleSubmit,
          form: {mutators: {push, pop}},
          submitting,
          values
        }) => {
          return <form
            onSubmit={handleSubmit}
            className={classes.form}
          >
          <AutoSave debounce={1000} save={save}/>
            <FieldArray name='todos'>
              {({fields}) =>
                fields.map((name, index) => <div
                  key={name}
                  className={classes.todoLine}
                >
                  <Typography
                    className={classes.standardSpace}
                    variant='title'
                  >
                    {index + 1}
                  </Typography>
                  <Field
                    name={`${name}`}
                    component={RegularTextField}
                    label='What to do?'
                    className={classes.textField}
                    validate={required}
                  />
                  <Button
                    size='small'
                    color='secondary'
                    className={classes.standardSpace}
                    onClick={() => fields.remove(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
                )}
            </FieldArray>
            <CardActions>
              <Button
                type='button'
                color='primary'
                onClick={() => push('todos', undefined)}>
                  Add Todo <AddIcon />
              </Button>
              <Button
                type='submit'
                variant='raised'
                color='primary'
              >
                Save
              </Button>
            </CardActions>
          </form>
        }}
      />
    </CardContent>
  </Card>
})
