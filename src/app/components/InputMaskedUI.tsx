import { Input } from "@nextui-org/react";
import { useController } from "react-hook-form";
import { useMask } from "@react-input/mask";

export default function InputMaskedUI(props: { label: string; name: string; control: any; rules: any; mask: any }) {
  const { field } = useController({ name: props.name, control: props.control, rules: props.rules });
  const inputRef = useMask({ ...props.mask, onMask: field.onChange });

  return (
    <div className="w-full flex_jb_ic">
      <label className="w-[30%] font-montserrat-500 text-[14px] text-main_text">{props.label}</label>
      <Input
        aria-label={props.name}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={inputRef}
        type="text"
        variant="bordered"
        classNames={{
          base: "w-[60%]",
          input: "bg-transparent text-[14px]",
          innerWrapper: "bg-transparent",
          inputWrapper: "border border-[#A8B7C7] font-montserrat-500 text-main_text py-[14px] h-auto rounded-[5px]",
        }}
      />
      <div className="w-[30%]"></div>
    </div>
  );
}
