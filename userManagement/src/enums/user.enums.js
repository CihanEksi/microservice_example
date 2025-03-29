const USER_ROLES = Object.freeze({
    Admin: 'Admin',
    SalesRepresentative: "Satış Temsilcisi",
    Warehouse: "Depo",
    Finance: "Finans",
    CustomerService: "Müşteri Hizmetleri",
    HumanResources: "İnsan Kaynakları",
    IT: "Bilgi İşlem",
    unAssigned: "Atanmamış Rol"
});

const USER_PROJECTION = Object.freeze({
    general : {
        password: 0,
        __v: 0,
    }
});

module.exports = {
    USER_ROLES,
    USER_PROJECTION
};