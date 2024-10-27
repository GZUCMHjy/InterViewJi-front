"use client"
import {searchQuestionVoByPageUsingPost} from '@/api/questionController';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import "./index.css"
import TagList from "@/components/TagList/index"
import Link from "next/link";
// 管理员使用的页面 不需要做 SEO
// 组件需要属性
interface Props {
    // 默认值，用于展示服务端渲染的数据
    searchText?: string;
    defaultQuestionList?: API.QuestionVO[];
    defaultTotal?: number;
    defaultSearchParams?: API.QuestionQueryRequest;
}


/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
    const {defaultQuestionList, defaultTotal, defaultSearchParam = {}} = props;
    const actionRef = useRef<ActionType>();
    const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
        defaultQuestionList || []);
    const [total, setTotal] = useState<number>(
        defaultTotal || 0);
    // 用于是否是第一次请求
    const [init, setInit] = useState<boolean>(true)
    // const res = await searchQuestionVoByPageUsingPost({
    //     pageSize: 12,
    //     sortField: "createTime",
    //     sortOrder: "descend",
    // });

    /**
     * 表格列配置
     */
    const columns: ProColumns<API.Question>[] = [
        {
            title: "标题",
            dataIndex: "title",
            valueType: "text",
            render: (_, record: API.QuestionVO) => {
                return <Link href={`/question/${record.id}`}>{record.title}</Link>
            }
        },
        {
            title: "搜索",
            dataIndex: "searchText",
            valueType: "text",
            hideInTable: true,
        },
        {
            title: "标签",
            dataIndex: "tagList",
            valueType: "select",
            fieldProps: {
                mode: "tags",
            },
            render: (_, record) => {
                return <TagList tagList={record.tagList}/>;
            },
        }
    ];


    return (
        <div className="question-table">
            <ProTable<API.QuestionVO>
                actionRef={actionRef}
                size="large"
                pagination={{
                    pageSize: 6,
                    showTotal: (total) => `总共 ${total} 条`,
                    total,
                    showSizeChanger: false,
                }}
                search={{
                    labelWidth: "auto",
                }}
                form={{
                    initialValues: defaultSearchParam,
                }}
                pagination={{
                    pageSize: 6, // 设置每页显示6条记录
                }}
                dataSource={questionList}
                request={async (params, sort, filter) => {
                    if (init) {
                        setInit(false);
                        if (defaultTotal && defaultQuestionList) {
                            return
                        }
                    }
                    const sortField = Object.keys(sort)?.[0] || 'createTime';
                    const sortOrder = sort?.[sortField] ?? 'descend';

                    const {data, code} = await searchQuestionVoByPageUsingPost({
                        ...params,
                        sortField: '_score',
                        sortOrder,
                        ...filter,
                    } as API.QuestionQueryRequest);

                    // 更新结果
                    const newData = data?.records || [];
                    const newTotal = data?.total || 0;
                    setQuestionList(newData)
                    setTotal(newTotal)
                    return {
                        success: code === 0,
                        data: newData,
                        total: newTotal,
                    };
                }}
                columns={columns}
            />
        </div>
    );
};
export default QuestionTable;
