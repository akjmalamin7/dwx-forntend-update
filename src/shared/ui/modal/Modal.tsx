import { CrossIcon } from "@/assets/icons";
import { createPortal } from "react-dom";
import { Button } from "../button";
import { Card } from "../card";
import { Text } from "../text";

interface Props {
  children?: React.ReactNode;
  title?: string;
  submitButton?: string;
  cancelButton?: string;
  headerPadding?: "xs" | "sm" | "md" | "lg" | "xlg" | "2xl" | "none";
  buttonColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "dark"
    | "white";
  cancelColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "dark"
    | "white";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

const Modal = ({
  children,
  title = "Modal Title",
  size = "sm",
  buttonColor = "white",
  cancelColor = "white",
  submitButton,
  cancelButton,
  headerPadding = "md",
  loading = false,
  disabled = false,
  onCancel,
  onOk,
}: Props) => {
  const sizes = {
    sm: "max-w-[520px] w-[100%] ",
    md: "max-w-[960px] w-[100%] ",
    lg: "max-w-[1200px] w-[100%] ",
  }[size];

  return createPortal(
    <>
      {/* Separate Overlay */}
      <div className="fixed w-full h-screen top-0 left-0 z-40 bg-[#1A1A1Ad2]  " />

      {/* Modal Content */}
      <div className="fixed w-full h-screen top-0 left-0 z-40 flex items-start justify-center pt-[60px]">
        <div className={`${sizes} mx-auto px-[20px]`}>
          <Card cardStyle="shadow" bgColor="white">
            <Card.CardHeader padding={headerPadding}>
              <div className="flex items-center justify-between">
                {title && (
                  <div>
                    <Text
                      size="md"
                      fontWeight="semiBold"
                      color="dark"
                      element="h3"
                    >
                      {title}
                    </Text>
                  </div>
                )}
                <div className="flex">
                  <Button
                    type="button"
                    variant="text"
                    onClick={onCancel}
                    className="h-[auto] lg:h-[auto] lg:cursor-pointer"
                  >
                    <CrossIcon color="dark" />
                  </Button>
                </div>
              </div>
            </Card.CardHeader>
            <Card.CardBody>{children}</Card.CardBody>

            <Card.CardFooter>
              <div className="flex justify-end gap-[12px]">
                {cancelButton && (
                  <Button
                    size="size-1"
                    type="button"
                    variant="outline"
                    color={cancelColor}
                    className={`text-gray-700 ${
                      disabled === false ? "lg:cursor-pointer" : "cursor-alias"
                    }`}
                    onClick={onCancel}
                  >
                    {cancelButton}{" "}
                  </Button>
                )}
                {submitButton && (
                  <Button
                    size="size-1"
                    type="button"
                    variant="fill"
                    color={buttonColor}
                    loading={loading}
                    disabled={disabled}
                    className={`${
                      disabled === false ? "lg:cursor-pointer" : "cursor-alias"
                    }`}
                    onClick={onOk}
                  >
                    {submitButton}
                  </Button>
                )}
              </div>
            </Card.CardFooter>
          </Card>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
