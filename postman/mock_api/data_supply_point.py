data_supply_points = [
        {
            "id": "1",
            "tariff":"One price",
            "invoiced_amount":"50.00",
            "power":{"p1":"94500","p2":"94200"},
            "neighbors":["2","3"]
        },
        {
            "id":"2",
            "tariff":"Two prices",
            "invoiced_amount":"45.00",
            "power":{"p1":"5000","p2":"4800"},
            "neighbors":["1","3"]
        },
        {
            "id":"3",
            "tariff":"One price",
            "invoiced_amount":"40.00",
            "power":{"p1":"5500","p2":"5800"},
            "neighbors":["2","1"]
        },
        {
            "id":"4",
            "tariff":"One price",
            "invoiced_amount":"68.00",
            "power":{"p1":"4200","p2":"4200"},
            "neighbors":[]
        },
        {
            "id":"5",
            "tariff":"One price",
            "invoiced_amount":"200.00",
            "power":{"p1":"6200","p2":"6000"},
            "neighbors":["6"]
        },
        {
            "id":"6",
            "tariff":"Three prices",
            "invoiced_amount":"10.00",
            "power":{"p1":"4700","p2":"4500"},
            "neighbors":["5"]
        }
        ]
