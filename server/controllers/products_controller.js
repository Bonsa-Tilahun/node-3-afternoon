module.exports = {
    create: (req, res) => {
        const db = req.app.get('db')
        const { name, description, price, image_url } = req.body
        db.create_product([name, description, price, image_url]).then(newProduct => {

            res.status(200).send(newProduct)
        }).catch(err => res.status(500).send(err))
    },
    getOne: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.read_product([id]).then(product => {
            res.status(200).send(product)
        }).catch(err => res.status(500).send(err))
    },
    getAll: (req, res) => {
        const db = req.app.get('db')
        db.read_products().then(products => {
            res.status(200).send(products)
        }).catch(err => res.status(500).send(err))
    },
    update: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { name, description, price, image_url } = req.body
        db.read_product([id]).then(product => {
            const updatedProduct = {...product[0], ...req.body }
            console.log(product)
            console.log(updatedProduct)
            db.update_product(updatedProduct).then(() => {
                res.sendStatus(200)
            }).catch((err) => {
                console.log(err, "Unable to update product")
                res.status(500).send("Unable to update product")
            })
        }).catch(() => {
            console.log("Unable to find product to update")
            res.status(500).send("Unable to find product to update")
        })
    },
    delete: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.delete_product([id]).then(() => res.status(200).send("Product Deleted")).catch(() => res.status(500).send("Unable to delete product"))
    },
}