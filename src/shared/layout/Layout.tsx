import { Button, Input, Text } from "@/shared/ui";

const Layout = () => {
  return (
    <div>
      <div>header</div>
      <div>
        <Text element="h1" size="3xl">
          Hello World
        </Text>
        <Button color="primary">Button</Button>
        <Input label="Input Label" placeholder="Enter text" />
      </div>
      <div>footer</div>
      foote
    </div>
  );
};

export default Layout;
