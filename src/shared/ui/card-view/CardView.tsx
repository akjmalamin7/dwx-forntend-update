import CardViewItem from "./CardViewItem";

interface CardViewProps {
  children?: React.ReactNode;
}
const CardView = ({ children }: CardViewProps) => {
  return (
    <div className="border border-[#ebebeb] rounded-xl p-4 flex flex-col gap-2">
      {children}
    </div>
  );
};
CardView.Item = CardViewItem;
export default CardView;
