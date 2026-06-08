router.post(
 "/",
 protect,
 addExpense
);

router.get(
 "/",
 protect,
 getExpenses
);

router.put(
 "/:id",
 protect,
 updateExpense
);

router.delete(
 "/:id",
 protect,
 deleteExpense
);