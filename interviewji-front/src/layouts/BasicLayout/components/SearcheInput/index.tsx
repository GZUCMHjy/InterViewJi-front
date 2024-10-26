// 搜索条
import {Input} from "antd";
import {useRouter} from "next/navigation";

// todo 留着扩展
interface Props {

}

const SearchInput = () => {
    const router = useRouter();
    return (
        <div
            className="search-input"
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
        >
            <Input.Search
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                placeholder="搜索题目"
                onSearch={(value) => {
                    router.push(`/questions?q=${value}`);
                }}
            />
        </div>
    );
};
export default SearchInput;
