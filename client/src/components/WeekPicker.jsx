import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const WeekPicker = () => {
  const weekFormat = "DD/MM/YYYY";
  const customWeekStartEndFormat = (value) =>
    `${dayjs(value).startOf("week").format(weekFormat)} - ${dayjs(value)
      .endOf("week")
      .format(weekFormat)}`;
  return (
    <Space direction="vertical">
      <DatePicker
        defaultValue={dayjs()} //Nåværende uke valgt som default
        format={customWeekStartEndFormat}
        picker="week"
        size="large"
        placeholder="Velg uke"
        // style={{}}
      />
    </Space>
  );
};

export default WeekPicker;
