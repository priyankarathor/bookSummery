export async function GET() {

  const data = [
    { month: "Jan", profit: 4000, loss: 2400 },
    { month: "Feb", profit: 3000, loss: 1398 },
    { month: "Mar", profit: 900, loss: 2000 },
    { month: "Apr", profit: 3908, loss: 2780 },
    { month: "May", profit: 4800, loss: 1890 },
    { month: "Jun", profit: 1300, loss: 2390 },
    { month: "July", profit: 1300, loss: 2390 },
  ];

  return Response.json(data);

}