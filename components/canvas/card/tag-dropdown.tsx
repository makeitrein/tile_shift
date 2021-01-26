import { Select } from "antd";

const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export const TagDropdown = () => (
  <Select
    mode="tags"
    bordered={false}
    defaultValue="lucy"
    style={{ width: 200 }}
    onChange={handleChange}
  >
    <OptGroup label="Type">
      <Option value="goal">Goal</Option>
      <Option value="assumption">Assumption</Option>
      <Option value="risk">Risk</Option>
      <Option value="task">Task</Option>
    </OptGroup>
    <OptGroup label="Priority">
      <Option value="High">High</Option>
      <Option value="Medium">Medium</Option>
      <Option value="Low">Low</Option>
    </OptGroup>
  </Select>
);
