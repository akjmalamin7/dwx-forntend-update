import { Text } from "../text";

interface CardViewItem {
  children?: React.ReactNode;
  label?: React.ReactNode;
  value?: React.ReactNode;
}
const CardViewItem = ({ children, label, value }: CardViewItem) => {
  return (
    <div className="flex gap-3">
      {children && children}
      {!children && (
        <>
          {label && (
            <Text size="xl" fontWeight="semiBold">
              {label}
            </Text>
          )}
          {value && <Text size="xl">{value}</Text>}
        </>
      )}
    </div>
  );
};

export default CardViewItem;
