SELECT area.Area, count(area.Area) as NumVeces
FROM histmedico.bitacoraconsulta as bc,
histmedico.empleados as emp,
histmedico.areasplanta as area
where 0=0
and bc.IdEmpleado = emp.IdEmpleado
and emp.Area = area.idAreasPlanta
group by area.Area
LIMIT 1000;

SELECT cd.ClasifDesc, count(cd.ClasifDesc) as NumVeces
FROM bitacoraconsulta as bc,
clasificaciondolor as cd
where 0=0
and bc.IdClasificacion = cd.idClasificacionDolor
group by cd.ClasifDesc
order by NumVeces desc;

SELECT cd.ClasifDesc, DATE_FORMAT(bc.CreationDate, "%Y-%m-%d") as fdate,count(cd.ClasifDesc) as NumVeces
FROM bitacoraconsulta as bc,
clasificaciondolor as cd
where 0=0
and bc.IdClasificacion = cd.idClasificacionDolor
group by cd.ClasifDesc, fdate
order by NumVeces desc;