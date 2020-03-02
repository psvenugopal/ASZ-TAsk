import React from 'react';
import { Button, Form, Input, DatePicker, Modal as AntdModal } from "antd";
import moment from "moment";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            name: "",
            email: "",
            action: "",
            date: "",
            key: "",
            disable: Object.keys(this.props.initialValues).length === 0 ? true : false
        }
    }

    handleChange = (e) => {
        switch (e.target.name) {
            case "name":
                this.setState({
                    ...this.state,
                    name: e.target.value
                }, () => this.enableSubmit(this.state))
                break;
            case "email":
                this.setState({
                    ...this.state,
                    email: e.target.value
                }, () => this.enableSubmit(this.state))
                break;
            case "action":
                this.setState({
                    ...this.state,
                    action: e.target.value
                }, () => this.enableSubmit(this.state))
                break;
            default:
                return null
        }
    }

    handleDateChange = (date) =>{
        this.setState({
            ...this.state,
            date: date
        }, () => this.enableSubmit(this.state))
    }

    handleOk = () => {
        const { name, email, action, date } = this.state;
        const data = {
            name,
            email,
            action,
            date
        }
        if ((name && email) || (action && date)) {
            this.props.create(data);
            this.onReset();
            this.props.toggleModal();
        }
    }

    handleUpdate = () => {
        const { name, email, action, date } = this.state;
        const data = {
            name,
            email,
            date,
            action,
            key: this.state.key
        }
        if ((name && email) || (action && date)) {
            this.props.update(data);
            this.onReset();
            this.props.toggleModal();
        }
    }

    onReset = () => {
        this.setState({
            ...this.state,
            name: '',
            email: '',
            action: '',
            date: '',
            disable: true
        })
        this.formRef.current.resetFields();
    };

    enableSubmit = (state) => {
        if ((state.name && state.email) || (state.action && state.date)) {
            this.setState({
                disable: false
            })
        } else {
            this.setState({
                disable: true
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { initialValues } = nextProps;
        this.setState({
            ...this.state,
            name: initialValues.name,
            email: initialValues.email,
            action: initialValues.action,
            date : new moment(initialValues.date),
            key: initialValues.key,
            disable: Object.keys(this.props.initialValues).length === 0 ? true : false
        })
    }

    render() {
        const { name, email, action, date, disable } = this.state;
        const { updation, inTodos } = this.props;
        return (
            <div>
                <AntdModal
                    title={Object.keys(this.props.initialValues).length === 0 ? "Create User" : "Edit User"}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.props.toggleModal}
                    footer={[
                        <Button key="back" onClick={this.props.toggleModal}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={updation ? this.handleUpdate : this.handleOk} disabled={disable}>
                            {updation ? "Update" : "Submit"}
                        </Button>
                    ]}
                >
                    <Form
                        {...layout}
                        name="basic"
                        ref={this.formRef}
                        onFinish={this.handleOk}
                        onFieldsChange={this.handleChange}
                    >
                        {
                            !inTodos ?
                                <div>
                                    <div>
                                        <label htmlFor="userName">name</label>
                                        <Input id="userName" name="name" value={name} onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="userEmail">email</label>
                                        <Input id="userEmail" name="email" value={email} onChange={this.handleChange} />
                                    </div>
                                </div>
                                :
                                <div>
                                    <div>
                                        <label htmlFor="userAction">action</label>
                                        <Input id="userAction" name="action" value={action} onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="userDate">date</label>
                                        <DatePicker
                                            id="userDate"
                                            name="date"
                                            value={date}
                                            onChange={this.handleDateChange}
                                            style={{ display: "block" }}
                                        />
                                    </div>
                                </div>
                        }
                    </Form>
                </AntdModal>
            </div>
        );
    }
};

export default Modal;