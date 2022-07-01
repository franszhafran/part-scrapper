<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use App\Models\Part;
class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_that_true_is_true()
    {
        $inputFileName = '/var/www/app/tests/Unit/data.xlsx';

        /** Load $inputFileName to a Spreadsheet object **/
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($inputFileName);
        $this->assertTrue(true);
        $worksheet = $spreadsheet->getActiveSheet();
        $highestRow = $worksheet->getHighestRow();
        $highestColumn = $worksheet->getHighestColumn();

        for ($row = 1; $row <= $highestRow; ++$row) {
            $part_no = $worksheet->getCellByColumnAndRow("1", $row)->getValue();
            $part_name = $worksheet->getCellByColumnAndRow("2", $row)->getValue();
            $sym = $worksheet->getCellByColumnAndRow("3", $row)->getValue();
            $qty = intval($worksheet->getCellByColumnAndRow("4", $row)->getValue());
            $spare = $worksheet->getCellByColumnAndRow("5", $row)->getValue();
            $material = $worksheet->getCellByColumnAndRow("6", $row)->getValue();
            $remark = $worksheet->getCellByColumnAndRow("7", $row)->getValue();
            $check = $worksheet->getCellByColumnAndRow("8", $row)->getValue();

            if($part_no == "") {
                continue;
            }

            Part::create([
                "number" => $part_no,
                "name" => $part_name,
                "qty" => $qty,
                "sym" => $sym,
                "qty" => $qty,
                "spare" => $spare,
                "material" => $material,
                "remark" => $remark,
                "check" => $check,
            ]);
        }
    }
}
