interface SummaryBoxProps {
    title: string;
    value: number;
  }
  
  export default function SummaryBox({ title, value }: SummaryBoxProps) {
    return (
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-xl font-bold">{value}</p>
      </div>
    );
  }
  