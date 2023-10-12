import { create, findAll, findByPk } from "../models/Expense";

export function postData(req, res, next) {
  // console.log(req.body, "post");
  create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

export function getData(req, res, next) {
  findAll()
    .then((result) => {
      // console.log("ressult>>>>>>>>", result);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

export function deleteData(req, res, next) {
  // console.log("delete id",req.params.id)
  findByPk(req.params.id)
    .then((result) => {
      // console.log("ressult>>>>>>>>", result);
      result.destroy();
    })
    .catch((err) => {
      res.json(err);
    });
}

export function updateData(req, res, next) {
  console.log("update id", req.params.id);
  console.log("update body", req.body);
  findByPk(req.params.id)
    .then((result) => {
      result.expense = req.body.expense;
      result.description = req.body.description;
      result.price = req.body.price;
      // console.log("ressult>>>>>>>>", result);
      return result.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
}
