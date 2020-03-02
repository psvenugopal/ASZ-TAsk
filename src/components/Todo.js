import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Button, Table } from "antd";

import Modal from "./Modal";
import { createTodo, editTodo, deleteTodo } from "../actions/todoActions";
import uuidv4 from "../utils";

const { Column } = Table;

class Todo extends React.Component {
    state = { visible: false, initialValues: {}, update: false };

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    createTodo = (values) => {
        const { actions } = this.props;
        const data = {
            action: values.action,
            date: values.date
        }
        data.key = uuidv4();
        localStorage.setItem("todos", JSON.stringify([...this.props.todos, data]));
        actions.createTodo(data);
    }

    updateUser = (values) => {
        const { actions } = this.props;
        const data = {
            key : values.key,
            action: values.action,
            date: values.date
        };
        let storedData = JSON.parse(localStorage.getItem('todos'))
        storedData.forEach((todo) => {
            if (todo.key === values.key) {
                todo.action = values.action
                todo.date = values.date
            }
        })
        localStorage.setItem("todos", JSON.stringify(storedData))
        actions.editTodo(data);
    }

    handleDelete = (key) => {
        const { actions } = this.props;
        const newList = JSON.parse(localStorage.getItem('todos')).filter((todo) => {
            return todo.key !== key
        });
        localStorage.setItem("todos", JSON.stringify([...newList]));
        actions.deleteTodo(key);
    }

    handleEdit = (record) => {
        this.setState({
            ...this.state,
            update: true,
            initialValues: {
                key: record.key,
                action: record.action,
                date: record.date
            }
        }, () => this.toggleModal())
    }

    handleTodo = () => {
        this.setState({
            ...this.state,
            initialValues: {},
            upadte: false,
        }, () => this.toggleModal())
    }

    render() {
        const { visible, initialValues, update } = this.state;
        return (
            <div>
                <Button style={{ marginBottom: 16 }} onClick={this.handleTodo}>Create Todo</Button>
                <Table dataSource={JSON.parse(localStorage.getItem('todos'))}>
                    <Column title="Action Want to do" dataIndex="action" key="action" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a onClick={() => this.handleEdit(record)} style={{ marginRight: 16 }}>Edit</a>
                                <a onClick={() => this.handleDelete(record.key)}>Delete</a>
                            </span>
                        )}
                    />
                </Table>
                <Modal
                    visible={visible}
                    toggleModal={this.toggleModal}
                    create={this.createTodo}
                    update={this.updateUser}
                    initialValues={initialValues}
                    updation={update}
                    inTodos={true}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { todos: state.todo.todos }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            { createTodo, editTodo, deleteTodo },
            dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);