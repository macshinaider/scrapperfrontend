import Link from "next/link";

export function MenuBar() {
  return (
    <nav className="flex gap-4">
      <Link href="/enviarplanilha">Enviar Planilha</Link>
      <Link href="/recuperado">Carros Encontrados</Link>
      <Link href="/perdidos">Carros Perdidos</Link>
    </nav>
  );
}
