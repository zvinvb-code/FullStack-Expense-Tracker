// Purpose: Store expenses

import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
{
    // userId links expense to owner.
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    amount:Number,
    category:String,
    description:String,
    date:Date
},
{
    timestamps:true
}
);

export default mongoose.model("Expense",expenseSchema);

// Logic

// One user can have many expenses.

// User
//   ↓
// Expense
// Expense
// Expense
// Expense

// userId links expense to owner.