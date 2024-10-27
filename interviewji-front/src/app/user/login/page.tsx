"use client"
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import Image from "next/image";
import Link from "next/link";
import {userLoginUsingPost} from "@/api/userController";
import {message} from "antd";
import {ProForm} from "@ant-design/pro-form/lib"
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setLoginUser} from "@/stores/loginUser";
import {AppDispatch} from "@/stores";

/**
 * 用户登录页面
 * @constructor
 */
const UserLoginPage: React.FC = () => {
    // 获取表单实例
    const [form] = ProForm.useForm();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const doSubmit = async (values: API.UserLoginRequest) => {
        const res = await userLoginUsingPost(values);
        try {
            if (res.data) {
                message.success("登录成功");
                console.log(res.data)
                // 保存用户状态
                dispatch(setLoginUser(res.data));
                // 跳转主页
                router.replace("/");
                // 登录完毕后，清空表单数据
                form.resetFields();
            }
        } catch (e) {
            message.error("登录失败" + e.message)
        }
    }
    return (
        <div id="userLoginPage">
            <LoginForm
                form={form}
                logo={<Image src="/assert/id.jpg" alt="面试基" height={44} width={44}/>}
                title="面试基 - 用户登录"
                subTitle="程序员面试刷题网站"
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

                <div
                    style={{
                        marginBlockEnd: 24,
                        textAlign: "end",
                    }}
                >
                    还没有账号?
                    <Link href={"/user/register"}>去注册</Link>
                </div>
            </LoginForm>
        </div>
    );
};
export default UserLoginPage;
