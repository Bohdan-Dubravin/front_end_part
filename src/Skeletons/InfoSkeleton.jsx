import { Card, Skeleton, TableCell, TableRow } from '@mui/material';

const InfoSkeleton = () => {
  return (
    <TableRow className="h-[40px]">
      <TableCell className="h-[40px] ">
        <Skeleton variant="rectangular" animation="wave" className="h-[100%]" />
      </TableCell>
      <TableCell className="h-[40px] w-[100%]">
        <Skeleton variant="rectangular" animation="wave" className="h-[100%]" />
      </TableCell>
      <TableCell className="h-[40px] w-[100%]">
        <Skeleton variant="rectangular" animation="wave" className="h-[20px]" />
      </TableCell>
      <TableCell className="h-[40px] w-[100%]">
        <Skeleton variant="rectangular" animation="wave" className="h-[100%]" />
      </TableCell>
      <TableCell className="h-[40px] w-[100%]">
        <Skeleton variant="rectangular" animation="wave" className="h-[100%]" />
      </TableCell>
    </TableRow>
  );
};

export default InfoSkeleton;
