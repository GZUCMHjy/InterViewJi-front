"use client";
import {Avatar, Card, List, Tag, Typography} from "antd";
import "./index.css";
import Link from "next/link";
import TagList from "@/components/TagList";

interface Props {
    questionBankId?: number;
    questionList: API.QuestionVO[];
    cardTitle?: string;
}

/**
 * 题库列表组件
 * @param props
 * @constructor
 */
const QuestionBankList = (props: Props) => {
    const {questionList = [], cardTitle, questionBankId} = props;
    return (
        <Card className="question-list" title={cardTitle}>
            <List
                dataSource={questionList}
                renderItem={(item) =>
                    <List.Item extra={<TagList tagList={item.tagList}/>}>
                        <List.Item.Meta title={
                            <Link
                                href={questionBankId ? `/bank/${questionBankId}/question/${item.id}` : `/question/${item.id}`}>
                                {item.title}
                            </Link>
                        }/>
                    </List.Item>}
            />
        </Card>
    );
};

export default QuestionBankList;
