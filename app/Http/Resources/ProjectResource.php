<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false; 
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id'=> $this->id,
            'name'=> $this->name,
            'description'=> $this->description,
            'created_at'=> (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date'=> (new Carbon($this->due_date))->format('Y-m-d'),
            'status'=> $this->status,
            'image_path'=> $this->image_path,
            // 'createdBy'=> $this->createdBy, //returns entire user object because it is used with belongsTo in project models
            'createdBy'=> new UserResource($this->createdBy),
            'updatedBy'=> new UserResource($this->updatedBy),
        ];
    }
}
