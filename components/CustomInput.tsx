import { Control, FieldPath } from "react-hook-form"
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { authFormSchema } from "@/lib/utils"

const formSchema = authFormSchema('sign-up');
interface CustomInput{
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
}
const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        // form-item
        <div className="flex flex-col gap-1.5 w-full">
          {/* form-label */}
          <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              {/* input-class */}
              <Input
                placeholder={placeholder}
                className="text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            {/* form-message */}
            <FormMessage
              className="text-12 text-red-500 mt-2"
            />
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput