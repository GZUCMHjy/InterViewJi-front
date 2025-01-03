import {updateQuestionUsingPost} from '@/api/questionController';
import {message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import Form from "antd/es/form/Form";
import {ProForm} from "@ant-design/pro-form/lib";
import {
    addQuestionBankQuestionUsingPost,
    listQuestionBankQuestionByPageUsingPost, removeQuestionBankQuestionUsingPost
} from "@/api/questionBankQuestionController";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";

interface Props {
    questionId?: number;
    visible: boolean;
    onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
        await updateQuestionUsingPost(fields);
        hide();
        message.success('更新成功');
        return true;
    } catch (error: any) {
        hide();
        message.error('更新失败，' + error.message);
        return false;
    }
};

/**
 * 更新所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
    const {questionId, visible, onCancel} = props;
    const [form] = ProForm.useForm();
    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>();
    // 获取所属题库列表
    const getCurrentQuestionBankIdList = async () => {
        try {
            const res = await listQuestionBankQuestionByPageUsingPost({
                questionId,
                pageSize: 20,
            });
            const list = (res.data.records ?? []).map((item) => item.questionBankId);
            form.setFieldValue("questionBankIdList" as any, list);
        } catch (e) {
            console.error("获取题目所属题库列表失败，" + e.message);
        }
    };

    useEffect(() => {
        if (questionId) {
            getCurrentQuestionBankIdList();
        }
    }, [questionId]);
    // 获取题库列表
    const getQuestionBankList = async () => {
        try {
            const res = await listQuestionBankVoByPageUsingPost({
                pageSize: 200,
                sortField: 'createTime',
                sortOrder: 'descend',
            })
            setQuestionBankList(res.data?.records ?? []);
        } catch (e) {
            console.error('获取题库列表失败，' + e.message);
        }
    }
    useEffect(() => {
        getQuestionBankList();
    }, []);
    return (
        <Modal
            destroyOnClose
            title={'更新所属题库'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            <Form form={form} style={{marginTop: 20}}>
                <Form.Item label="所属题库" name="questionBankIdList">
                    <Select mode="multiple" style={{width: "100%"}}
                            options={
                                questionBankList?.map(questionBank => {
                                    return {
                                        label: questionBank.title,
                                        value: questionBank.id,
                                    }
                                })
                            }
                            onSelect={async (value) => {
                                const hide = message.loading("正在更新");
                                try {
                                    await addQuestionBankQuestionUsingPost({
                                        questionId,
                                        questionBankId: value,
                                    });
                                    hide();
                                    message.success("绑定题库成功");
                                } catch (error: any) {
                                    hide();
                                    message.error("绑定题库失败，" + error.message);
                                }
                            }}
                            onDeselect={async (value) => {
                                const hide = message.loading("正在更新");
                                try {
                                    await removeQuestionBankQuestionUsingPost({
                                        questionId,
                                        questionBankId: value,
                                    });
                                    hide();
                                    message.success("取消绑定题库成功");
                                } catch (error: any) {
                                    hide();
                                    message.error("取消绑定题库失败，" + error.message);
                                }
                            }}

                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UpdateBankModal;
