// src/components/dashboard/BillsManager.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaFileInvoiceDollar, FaSearch, FaFilter, FaDownload,
  FaCreditCard, FaEye, FaSort, FaSortUp, FaSortDown,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import Button from '../common/Button.jsx';

// Stile per il container della gestione bollette
const BillsContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

// Stile per l'header della sezione
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

// Stile per il titolo della sezione
const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.8rem;
    color: ${({ theme }) => theme.primary};
  }
`;

// Stile per i controlli della sezione
const SectionControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

// Stile per la barra di ricerca
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.5rem 1rem;
  width: 260px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }

  svg {
    color: ${({ theme }) => theme.textLight};
    margin-right: 0.8rem;
  }
`;

// Stile per il campo di ricerca
const SearchInput = styled.input`
  background: none;
  border: none;
  flex: 1;

  &:focus {
    outline: none;
  }
`;

// Stile per il pulsante filtro
const FilterButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: ${({ theme, active }) => active ? theme.primary : theme.textLight};
  padding: 0.5rem;
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Stile per il pannello filtri
const FilterPanel = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

// Stile per la griglia dei filtri
const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

// Stile per un gruppo di filtri
const FilterGroup = styled.div``;

// Stile per l'etichetta di un filtro
const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
`;

// Stile per un select di filtro
const FilterSelect = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

// Stile per la tabella delle bollette
const BillsTable = styled.div`
  width: 100%;
  overflow-x: auto;
`;

// Stile per la tabella
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Stile per l'intestazione della tabella
const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.backgroundLight};

  th {
    position: sticky;
    top: 0;
    background-color: inherit;
    z-index: 1;
  }
`;

// Stile per una riga della tabella
const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};
  }

  &:hover {
    background-color: ${({ theme }) => theme.backgroundLight}50;
  }
`;

// Stile per l'intestazione di una colonna
const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  cursor: ${({ sortable }) => sortable ? 'pointer' : 'default'};
  white-space: nowrap;

  svg {
    margin-left: 0.3rem;
    vertical-align: middle;
  }

  &:hover {
    color: ${({ sortable, theme }) => sortable ? theme.primary : 'inherit'};
  }
`;

// Stile per una cella della tabella
const TableCell = styled.td`
  padding: 1rem;
  white-space: nowrap;
`;

// Stile per lo stato di una bolletta
const BillStatus = styled.span`
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  text-align: center;

  background-color: ${({ status, theme }) => {
    switch(status) {
      case 'Pagata': return `${theme.success}20`;
      case 'Da pagare': return `${theme.warning}20`;
      case 'In scadenza': return `${theme.error}20`;
      default: return `${theme.textLight}20`;
    }
  }};

  color: ${({ status, theme }) => {
    switch(status) {
      case 'Pagata': return theme.success;
      case 'Da pagare': return theme.warning;
      case 'In scadenza': return theme.error;
      default: return theme.textLight;
    }
  }};
`;

// Stile per le azioni sulla bolletta
const BillActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Stile per la navigazione delle pagine
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

// Stile per le informazioni sulla paginazione
const PaginationInfo = styled.div`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
`;

// Stile per i controlli di paginazione
const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Stile per un pulsante di paginazione
const PageButton = styled.button`
  background-color: ${({ active, theme }) => active ? theme.primary : 'white'};
  color: ${({ active }) => active ? 'white' : 'inherit'};
  border: 1px solid ${({ active, theme }) => active ? theme.primary : '#ddd'};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0.5rem 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.primary : theme.backgroundLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    vertical-align: middle;
  }
`;

/**
 * Componente per la gestione e visualizzazione delle bollette
 * @param {Object} props - Proprietà del componente
 * @param {Array} props.bills - Elenco delle bollette da visualizzare
 */
const BillsManager = ({ bills = [] }) => {
  // Stato per la ricerca
  const [searchQuery, setSearchQuery] = useState('');

  // Stato per il pannello filtri
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Stato per i filtri
  const [filters, setFilters] = useState({
    year: '',
    type: '',
    status: '',
  });

  // Stato per l'ordinamento
  const [sorting, setSorting] = useState({
    field: 'date',
    direction: 'desc',
  });

  // Stato per la paginazione
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });

  // Gestisce il cambio della query di ricerca
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Gestisce il cambio dei filtri
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Gestisce il cambio dell'ordinamento
  const handleSortChange = (field) => {
    setSorting(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Ottiene l'icona di ordinamento appropriata
  const getSortIcon = (field) => {
    if (sorting.field !== field) {
      return <FaSort />;
    }
    return sorting.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  // Filtra le bollette in base alla ricerca e ai filtri
  const filteredBills = bills.filter(bill => {
    // Filtro per la ricerca
    if (searchQuery && !bill.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filtro per l'anno
    if (filters.year && !bill.date.includes(filters.year)) {
      return false;
    }

    // Filtro per il tipo
    if (filters.type && bill.type !== filters.type) {
      return false;
    }

    // Filtro per lo stato
    if (filters.status && bill.status !== filters.status) {
      return false;
    }

    return true;
  });

  // Ordina le bollette
  const sortedBills = [...filteredBills].sort((a, b) => {
    let comparison = 0;

    switch (sorting.field) {
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
      case 'date':
        // Converte le date nel formato italiano (DD/MM/YYYY) in oggetti Date
        const partsA = a.date.split('/');
        const partsB = b.date.split('/');
        const dateA = new Date(partsA[2], partsA[1] - 1, partsA[0]);
        const dateB = new Date(partsB[2], partsB[1] - 1, partsB[0]);
        comparison = dateA - dateB;
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }

    return sorting.direction === 'asc' ? comparison : -comparison;
  });

  // Calcola la paginazione
  const { currentPage, itemsPerPage } = pagination;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBills.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedBills.length / itemsPerPage);

  // Genera i numeri di pagina da visualizzare
  const pageNumbers = [];
  const maxPageNumbers = 5; // Numero massimo di pulsanti pagina da mostrare
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Cambia pagina
  const changePage = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
  };

  // Estrae i tipi di bollette unici per il filtro
  const uniqueTypes = [...new Set(bills.map(bill => bill.type))];

  // Estrae gli stati unici per il filtro
  const uniqueStatuses = [...new Set(bills.map(bill => bill.status))];

  // Estrae gli anni unici per il filtro
  const uniqueYears = [...new Set(bills.map(bill => {
    const parts = bill.date.split('/');
    return parts[2];
  }))];

  return (
    <BillsContainer>
      <SectionHeader>
        <SectionTitle>
          <FaFileInvoiceDollar />
          Gestione Bollette
        </SectionTitle>

        <SectionControls>
          <SearchBar>
            <FaSearch />
            <SearchInput 
              type="text" 
              placeholder="Cerca bolletta..." 
              value={searchQuery} 
              onChange={handleSearchChange} 
            />
          </SearchBar>

          <FilterButton 
            active={isFilterOpen} 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter /> Filtri
          </FilterButton>
        </SectionControls>
      </SectionHeader>

      <FilterPanel isOpen={isFilterOpen}>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Anno</FilterLabel>
            <FilterSelect 
              name="year" 
              value={filters.year} 
              onChange={handleFilterChange}
            >
              <option value="">Tutti gli anni</option>
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Tipo</FilterLabel>
            <FilterSelect 
              name="type" 
              value={filters.type} 
              onChange={handleFilterChange}
            >
              <option value="">Tutti i tipi</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Stato</FilterLabel>
            <FilterSelect 
              name="status" 
              value={filters.status} 
              onChange={handleFilterChange}
            >
              <option value="">Tutti gli stati</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
        </FilterGrid>
      </FilterPanel>
      <BillsTable>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader sortable onClick={() => handleSortChange('id')}>
                Numero {getSortIcon('id')}
              </TableHeader>
              <TableHeader sortable onClick={() => handleSortChange('date')}>
                Data {getSortIcon('date')}
              </TableHeader>
              <TableHeader sortable onClick={() => handleSortChange('type')}>
                Tipo {getSortIcon('type')}
              </TableHeader>
              <TableHeader sortable onClick={() => handleSortChange('amount')}>
                Importo {getSortIcon('amount')}
              </TableHeader>
              <TableHeader sortable onClick={() => handleSortChange('status')}>
                Stato {getSortIcon('status')}
              </TableHeader>
              <TableHeader>Scadenza</TableHeader>
              <TableHeader>Azioni</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan="7" style={{ textAlign: 'center' }}>
                  Nessuna bolletta trovata
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map(bill => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.type}</TableCell>
                  <TableCell>€ {bill.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <BillStatus status={bill.status}>
                      {bill.status}
                    </BillStatus>
                  </TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>
                    <BillActions>
                      <Button 
                        size="small" 
                        variant="secondary" 
                        outlined 
                        icon={<FaDownload />}
                        iconPosition="left"
                      >
                        PDF
                      </Button>

                      {bill.status !== 'Pagata' && (
                        <Button 
                          size="small" 
                          variant="primary" 
                          icon={<FaCreditCard />}
                          iconPosition="left"
                        >
                          Paga
                        </Button>
                      )}
                    </BillActions>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </BillsTable>

      {totalPages > 1 && (
        <Pagination>
          <PaginationInfo>
            Visualizzazione {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedBills.length)} di {sortedBills.length} bollette
          </PaginationInfo>

          <PaginationControls>
            <PageButton 
              onClick={() => changePage(1)} 
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> <FaChevronLeft />
            </PageButton>

            <PageButton 
              onClick={() => changePage(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </PageButton>

            {pageNumbers.map(number => (
              <PageButton 
                key={number} 
                active={currentPage === number} 
                onClick={() => changePage(number)}
              >
                {number}
              </PageButton>
            ))}

            <PageButton 
              onClick={() => changePage(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </PageButton>

            <PageButton 
              onClick={() => changePage(totalPages)} 
              disabled={currentPage === totalPages}
            >
              <FaChevronRight /> <FaChevronRight />
            </PageButton>
          </PaginationControls>
        </Pagination>
      )}
      </BillsContainer>
      );
      };

      export default BillsManager;