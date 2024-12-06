import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export default function CommonForm({
  formControl,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function inputRenderingByType(item) {
    let element = null;
    const value = formData[item.name] || "";

    switch (item.componentType) {
      case "input":
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [item.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.label} />
            </SelectTrigger>
            <SelectContent>
              {item.options && item.options.length > 0
                ? item.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={item.name}
            placeholder={item.placeholder}
            id={item.id}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
          />
        );

        break;
      default:
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="mt-5 flex flex-col gap-4">
        {formControl.map((item) => (
          <div key={item.name} className="grid w-full gap-1.5">
            <label name={item.name} className="mb-1 font-sm">
              {item.label}
            </label>
            {inputRenderingByType(item)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}
