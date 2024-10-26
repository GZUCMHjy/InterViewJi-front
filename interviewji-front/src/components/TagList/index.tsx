import React from 'react';
import './index.css'
import {Tag} from "antd";
interface Props {
    tagList?: string[];
}
const TagList = (props: Props) =>  {
    const currentYear = new Date().getFullYear()
    const {tagList = []} = props;
    return (
        <div
            className="tag-list"
        >
            {tagList.map((tag) => {
                return <Tag key = {tag}>{tag}</Tag>
            })}
        </div>
    );
};
export default TagList ;
