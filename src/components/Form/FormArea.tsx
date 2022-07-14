import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

interface FormAreaProps extends FormControlProps {
  htmlFor: string;
  formLabel: string;
  labelColor?: string;
  helperTextColor?: string;
  formHelperText?: string;
}

export function FormArea(props: FormAreaProps) {
  const {
    formLabel,
    htmlFor,
    formHelperText,
    children,
    labelColor,
    helperTextColor,
    ...rest
  } = props;

  const parsedHelperText = formHelperText
    ?.split("\\n")
    .map((str, i) => <p key={i}>{str}</p>);

  return (
    <FormControl {...rest}>
      <FormLabel htmlFor={htmlFor} color={labelColor}>
        {formLabel}
      </FormLabel>
      {children}
      {formHelperText && (
        <FormHelperText color={helperTextColor}>{parsedHelperText}</FormHelperText>
      )}
    </FormControl>
  );
}
