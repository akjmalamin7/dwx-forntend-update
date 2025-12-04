const UserSignature = ({ image }: { image?: string[] }) => {
  if (!image || !image.length) return null;

  return (
    <div className="flex items-center justify-center">
      <img className="h-[50px]" src={image[0]} />
    </div>
  );
};

export default UserSignature;
