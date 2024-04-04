type Person = {
  name: string;
  phone?: string;
  street: string;
  city: string;
  id: string;
};
type YesNo = {
  phone: "YES" | "NO";
};
type newPerson = {
  name: string;
  phone?: string;
  street: string;
  city: string;
};

type nameArgs = {
  name: string;
};
type Address = {
  city: string;
  street: string;
};
export type { newPerson };
export type { Address };
export type { nameArgs };
export type { Person };
export { YesNo };
