import { Select, SelectItem } from "@nextui-org/react";
import { useController } from "react-hook-form";

const SelectUI = (props: {
  data: { value: string; label: string }[];
  label: string;
  name: string;
  control: any;
  rules: any;
  onChange?: (e: any) => void;
  disabled?: boolean;
  multipleSelect?: boolean;
  defaultValue?: string;
}) => {
  const { field } = useController({ name: props.name, control: props.control, rules: props.rules });
  let value;

  if (Array.isArray(field.value)) {
    value = field.value;
  } else {
    value = [field.value];
  }

  return (
    <div className="w-full flex_jb_ic">
      <label className="w-[30%] font-montserrat-500 text-[14px] text-main_text h-fit">{props.label}</label>
      <Select
        onChange={(e: any) => {
          let value = e.target.value;
          if (!Array.isArray(value)) {
            value = value.split(",");
          }
          field.onChange(value);
          if (props.onChange) {
            props.onChange(value);
          }
        }}
        selectedKeys={value}
        isDisabled={props.disabled && props.disabled}
        aria-label={props.name}
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
        items={props.data}
        selectionMode={props.multipleSelect ? "multiple" : "single"}
        placeholder="Выберите"
        labelPlacement="outside"
        classNames={{
          base: "w-[60%] overflow-hidden",
          trigger: "bg-transparent rounded-[5px] py-[12px] h-auto border border-[#A8B7C7]",
          innerWrapper: "",
          value: " text-[14px] font-montserrat-500 text-main_text",
          listbox: "text-[14px] font-montserrat-500 text-main_text",
        }}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <div className="w-[30%]"></div>
    </div>
  );
};

export default SelectUI;
