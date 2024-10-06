interface LayoutProps {
  children: React.ReactNode;
}

const LayoutAdmin = async ({ children }: LayoutProps) => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default LayoutAdmin;
