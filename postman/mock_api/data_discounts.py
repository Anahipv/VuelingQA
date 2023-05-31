data_discounts = [
                    {
                        "discount":"standard_offer",
                        "id":"1",
                        "percentage_discount":"0",
                        "conditions":{},
                        "clients":["2","4","6"]
                    },
                    {
                        "discount":"basic_discount",
                        "id":"2",
                        "percentage_discount":"5",
                        "conditions":{
                            "1":"its neighbors should have p1 and p2 powers lower than the current client's supply point."
                        },
                        "clients":["1","5"]
                    },
                    {
                        "discount":"special discount",
                        "id":"3",
                        "percentage_discount":"12",
                        "conditions":{
                            "1":"its neighbors should have p1 and p2 powers lower than the current client's supply point.",
                            "2":"the addition of the invoiced_amount of its neighbors should be more than 100 euros"
                        },
                        "clients":["3"]
                    }
                ]
