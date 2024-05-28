export const CUSTOMERSCACHEKEYS = {
  CUSTOMERS: {
    key: "customers",
    tags: ["customers"],
    revalidate: 3600,
  },
  CUSTOMERSDETAIL: {
    key: "customers-detail",
    tags: ["customers-detail"],
    revalidate: 3600,
  },
};
