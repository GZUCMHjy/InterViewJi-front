"use client"
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import Image from "next/image";
import Link from "next/link";
import {userLoginUsingPost, userRegisterUsingPost} from "@/api/userController";
import {message} from "antd";
import {ProForm} from "@ant-design/pro-form/lib"
import {useRouter} from "next/navigation";

/**
 * 用户注册页面
 * @constructor
 */
const userRegisterPage: React.FC = () => {
    // 获取表单实例
    const [form] = ProForm.useForm();
    const router = useRouter();
    const doSubmit = async (values: API.UserRegisterRequest) => {
        const res = await userRegisterUsingPost(values);
        try {
            if (res.data) {
                message.success("注册成功");
                // 跳转页面
                router.replace("/user/login");
                // 注册完毕后，清空表单数据
                form.resetFields();
            }
        } catch (e) {
            message.error("注册失败" + e.message)
        }

    }
    return (
        <div id="userRegisterPage">
            <LoginForm
                form={form}
                logo={<Image src="/assert/id.jpg" alt="面试基" height={44} width={44}/>}
                title="面试基 - 用户注册"
                subTitle="程序员面试刷题网站"
                submitter={{
                    searchConfig: {
                        submitText: "注册",
                    }
                }}
                onFinish={doSubmit}
            >
                <ProFormText
                    name="userAccount"
                    // 表单参数
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined/>,
                    }}
                    placeholder={'请输入用户账号'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户账号!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="userPassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined/>,
                        strengthText:
                            'Password should contain numbers, letters and special characters, at least 8 characters long.',
                    }}
                    placeholder={'请输入用户密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="checkPassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined/>,
                        strengthText:
                            'Password should contain numbers, letters and special characters, at least 8 characters long.',
                    }}
                    placeholder={'请输入确认密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入确认密码！',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                        textAlign: "end",
                    }}
                >
                    已有账号?
                    <Link href={"/user/login"}>去登录</Link>
                </div>
            </LoginForm>
        </div>
    );
};
export default userRegisterPage;
