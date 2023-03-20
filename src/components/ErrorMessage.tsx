import { AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { Alert } from 'react-bootstrap'

interface IErrorMessageProps {
  // I didn't have time to convert the error to a proper model hence, using the forbidden "any" here. I know it is a sin!
  errors: AxiosResponse | any
  hideError: Dispatch<React.SetStateAction<boolean>>
}

// The error message can be from ModelState or just as a response along with something like BadRequest
// Hence, the below code merges the two together
export const ErrorMessage = ({ errors, hideError }: IErrorMessageProps) => {
  const flattenErrors = () => {
    let flattenedErrorList: string[] = []

   if (errors?.errors) {
    for (const [, value] of Object.entries(errors.errors)) {
      const errorMessage = value as string;
      flattenedErrorList = [...flattenedErrorList, errorMessage]
    }
   }
   else {
    flattenedErrorList = [...flattenedErrorList, errors]
   }

    return flattenedErrorList
  }

  return (
    <Alert variant="danger" onClose={() => hideError(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      {flattenErrors().map((err: string) => (
        <p key={err}>{err}</p>
      ))}
    </Alert>
  )
}
