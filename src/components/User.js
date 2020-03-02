import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { Button, Table } from "antd";

import Modal from "./Modal";
import { createUser, editUser, deleteUser } from "../actions/userActions";
import uuidv4 from "../utils";

const { Column } = Table;


class User extends React.Component {
    state = { visible: false, initialValues: {}, update: false };

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    createUser = (values) => {
        const { actions } = this.props;
        const data = {
            name : values.name,
            email: values.email
        }
        data.key = uuidv4();
        localStorage.setItem("users", JSON.stringify([...this.props.users, data]));
        actions.createUser(data);
    }

    updateUser = (values) => {
        const { actions } = this.props;
        const data = {
            key : values.key,
            name: values.name,
            email: values.email
        }
        let storedData = JSON.parse(localStorage.getItem('users'))
        storedData.forEach((user) => {
            if (user.key === data.key) {
                user.name = data.name
                user.email = data.email
            }
        })
        localStorage.setItem("users", JSON.stringify(storedData))
        actions.editUser(data);
    }

    handleDelete = (key) => {
        const { actions } = this.props;
        const newList = JSON.parse(localStorage.getItem('users')).filter((user) => {
            return user.key !== key
        });
        localStorage.setItem("users", JSON.stringify([...newList]));
        actions.deleteUser(key);
    }

    handleEdit = (record) => {
        this.setState({
            ...this.state,
            update: true,
            initialValues: {
                key: record.key,
                name: record.name,
                email: record.email
            }
        }, () => this.toggleModal())
    }

    handleCreateUser = () => {
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
                <Button style={{ marginBottom: 16 }} onClick={this.handleCreateUser}>Create User</Button>
                <Table dataSource={JSON.parse(localStorage.getItem('users')) || []}>
                    <Column title="First Name" dataIndex="name" key="name" />
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
                    create={this.createUser}
                    update={this.updateUser}
                    initialValues={initialValues}
                    updation={update}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { users: state.user.users }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            { createUser, editUser, deleteUser },
            dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);