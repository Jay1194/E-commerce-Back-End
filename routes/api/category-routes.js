const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

  Category.findAll(
    {
    attributes: ['id','category_name'],
    include: [
      {
    attributes: ['product_name','id','stock'],
     model: Product,
   }]}
 
  )
  .then(Category => res.json(Category))
  .catch(err => { console.log(err);
  res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {

  Category.findOne(
    {
    where: {id: req.params.id},
      include: {      
      attributes: ['category_id','id'],
       model: Product,
     attributes: ['id', 'product_name', 'stock'],
    }
  })
    .then(Category => res.json(Category))
    .catch(err => { console.log(err);
    res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  
  Category.create({
    category_name: req.body.category_name
  })
    .then(Category => res.json(Category))
    .catch(err => { console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  
  Category.update(
    req.body,{
    where: { id: req.params.id}})
  .then((Category) => {
    res.status(200).json(Category);})
  .catch((err) => { res.status(500).json(err);})
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {id: req.params.id}
  })
    .then(Category => {
      if (!Category) {res.status(404).json({ 
        message:'Category not found'});
        return; }
      res.json(Category); })
    .catch(err => {console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
