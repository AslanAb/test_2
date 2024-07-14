import { Textarea } from "@nextui-org/react";
import { useController } from "react-hook-form";

export default function TextAreaUI(props: { label: string; name: string; control: any; rules: any }) {
  const { field } = useController({ name: props.name, control: props.control, rules: props.rules });
  return (
    <div className="w-full flex_jb_ic">
      <label className="w-[30%] font-montserrat-500 text-[14px] text-main_text">{props.label}</label>
      <Textarea
        aria-label={props.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
        minRows={3}
        variant="bordered"
        classNames={{
          base: "w-[60%]",
          input: "bg-transparent text-[14px]",
          innerWrapper: "bg-transparent",
          inputWrapper: "border border-[#A8B7C7] font-montserrat-500 text-main_text py-[14px] rounded-[5px]",
        }}
      />
      <div className="w-[30%]"></div>
    </div>
  );
}
