import { Checkbox } from "@nextui-org/react";
import { useController } from "react-hook-form";

export default function InputUI(props: { label: string; name: string; control: any; rules: any }) {
  const { field } = useController({ name: props.name, control: props.control, rules: props.rules });
  return (
    <div className="w-full flex_jb_ic">
      <label className="w-[30%] font-montserrat-500 text-[14px] text-main_text">{props.label}</label>
      <div className="w-[60%]">
        <Checkbox
          aria-label={props.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          name={field.name}
          ref={field.ref}
        />
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
}
