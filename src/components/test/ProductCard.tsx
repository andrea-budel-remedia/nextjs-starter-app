'use client';
import { Card, Typography, CardContent, CardMedia } from '@mui/material';
import { PropsWithChildren } from 'react';

export type ProductCardProps = PropsWithChildren & {
  className?: string;
  title: string;
  description: string;
  thumbnail: string;
};
export default function ProductCard({
  title,
  description,
  thumbnail,
}: ProductCardProps) {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={thumbnail} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
