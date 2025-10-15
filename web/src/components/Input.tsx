interface InputProps {
  placeholder: string;
  refrence?: any;
}

export function Input({ placeholder, refrence }: InputProps) {
  return (
    <div>
      <input
        ref={refrence}
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2 border rounded-md m-2"
      />
    </div>
  );
}
