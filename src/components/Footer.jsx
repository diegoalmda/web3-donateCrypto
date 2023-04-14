import Link from "next/link";

export function Footer() {
  const newDate = new Date()
  
  return (
    <footer className="container px-4 py-3 d-flex flex-wrap justify-content-between align-items-center my-4 border-top">
      <p className="col-md-4 mb-0 text-body-secondary">
        &copy; {newDate.getFullYear()} Donate crypto, Inc.
      </p>
      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <Link href="/" className="nav-link px-2 text-body-primary">Início</Link>
        </li>
        <li className="nav-item">
          <Link href="/create" className="nav-link px-2 text-body-primary">Nova Campanha</Link>
        </li>
        <li className="nav-item">
          <Link href="/donate" className="nav-link px-2 text-body-primary">Doar</Link>
        </li>
        <li className="nav-item">
          <Link href="/" className="nav-link px-2 text-body-primary">Sobre</Link>
        </li>
      </ul>
    </footer>
  )
}