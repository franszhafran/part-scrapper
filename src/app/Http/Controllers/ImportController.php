<?php

namespace App\Http\Controllers;

use App\Models\Kanban;
use App\Models\KanbanPart;
use App\Models\Library;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    public function importPart(Request $request) {
        $this->validate($request, [
            "kanban_name" => "required|string",
            "kanban_file" => "required|file",
        ]);
        $kanban = Kanban::where("name", $request->kanban_name)->first();
        if($kanban instanceof Kanban) {
            return $this->sendError("Kanban already exist", "Error", 400);
        }

        try {
            DB::beginTransaction();
            $kanban = Kanban::create([
                "name" => $request->kanban_name,
            ]);
    
            $input_file = $request->file("kanban_file");
            if(is_null($input_file)) {
    
            }
    
            /** Load $inputFileName to a Spreadsheet object **/
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($input_file->getRealPath());
            $worksheet = $spreadsheet->getActiveSheet();
            $highestRow = $worksheet->getHighestRow();
            $highestColumn = $worksheet->getHighestColumn();
            $parts = [];
            for ($row = 2; $row <= $highestRow; ++$row) {
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

                $library = Library::where("part_no", $part_no)->first();
                $price = 0;
                if($library) {
                    $price = $library->price;
                }
                
                $part = Part::create([
                    "number" => $part_no,
                    "name" => $part_name,
                    "qty" => $qty,
                    "sym_part" => $sym,
                    "spare" => $spare,
                    "material" => $material,
                    "remark" => $remark,
                    "check" => $check,
                    "price" => 0,
                ]);
    
                $parts[] = $part->id;
                KanbanPart::create([
                    "id_kanban" => $kanban->id,
                    "id_part" => $part->id,
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage(), "Error", 500);
        }

        return $this->sendOk();
    }

    public function importLibrary(Request $request) {
        $this->validate($request, [
            "kanban_file" => "required|file",
        ]);

        try {
            DB::beginTransaction();

            Library::truncate();

            $input_file = $request->file("kanban_file");
            if(is_null($input_file)) {
    
            }
    
            /** Load $inputFileName to a Spreadsheet object **/
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($input_file->getRealPath());
            $worksheet = $spreadsheet->getActiveSheet();
            $highestRow = $worksheet->getHighestRow();
            $highestColumn = $worksheet->getHighestColumn();
            $parts = [];
            for ($row = 11; $row <= 350; ++$row) {
                $part_no = $worksheet->getCellByColumnAndRow("1", $row)->getValue();
                $die_no = $worksheet->getCellByColumnAndRow("2", $row)->getValue();
                $process = $worksheet->getCellByColumnAndRow("3", $row)->getValue();
                $part_name = $worksheet->getCellByColumnAndRow("4", $row)->getValue();
                $material = $worksheet->getCellByColumnAndRow("5", $row)->getValue();
                $remark = $worksheet->getCellByColumnAndRow("6", $row)->getValue();
                $maker = $worksheet->getCellByColumnAndRow("7", $row)->getValue();
                $code = $worksheet->getCellByColumnAndRow("8", $row)->getValue();
                $price = $worksheet->getCellByColumnAndRow("9", $row)->getValue();
    
                if($part_no == "") {
                    continue;
                }

                Library::create([
                    "part_no" => $part_no,
                    "die_no" => $die_no,
                    "process" => $process,
                    "part_name" => $part_name,
                    "material" => !is_null($material) ? $material : "",
                    "remark" => $remark,
                    "maker" => !is_null($maker) ? $maker : "",
                    "code" => !is_null($code) ? $code : "",
                    "price" => $price,
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage(), "Error", 500);
        }

        return $this->sendOk();
    }
}
