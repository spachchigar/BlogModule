import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from './components/ui/pagination'
import { paginationDataState } from './BlogList'

const PaginationComponent = ({
    paginationData,
}: {
    paginationData: paginationDataState
}) => {
    return (
        <Pagination>
            <PaginationContent>
                {paginationData.hasPrev && (
                    <PaginationItem>
                        <PaginationPrevious
                            href={`${paginationData.prevUrl}`}
                        />
                    </PaginationItem>
                )}
                {paginationData.hasNext && (
                    <PaginationItem>
                        <PaginationNext href={`${paginationData.nextUrl}`} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
