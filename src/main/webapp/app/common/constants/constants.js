app.constant('BASE_SERVER_URL', "/api");
app.constant("ProductStatus", {
    AVAILABLE : {
        label: "Disponivel",
        value: 1,
        key: "AVAILABLE"
    },
    UNAVAILABLE : {
        label: "Em Falta",
        value: 2,
        key: "UNAVAILABLE"
    }

});
app.constant("DiscountType" , {
    NO_DISCOUNT : {
        label: "0 %",
        discountMultiplyer: 1,
        key: "NO_DISCOUNT"
    },
    GOOD_DISCOUNT : {
        label: "10%",
        discountMultiplyer: 0.9,
        key: "GOOD_DISCOUNT"
    }, 
    GREAT_DISCOUNT : {
        label: "25 %",
        discountMultiplyer: 0.75,
        key: "GREAT_DISCOUNT"
    },
    SUPER_DISCOUNT : {
        label: "50 %",
        discountMultiplyer: 0.5,
        key: "SUPER_DISCOUNT"
    }
});